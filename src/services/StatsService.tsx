import { Puppet } from "interfaces/puppet";

export class StatsService {
    public static downloadPuppetStats(puppets: Puppet[]) {
        // Get formated content
        const fileContent = this.getFormatedPuppetInfo(puppets);
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Create an invisible <a> element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = this.getFileTitle();
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();

        // Clean up by removing the <a> element and revoking the URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    private static getFileExtension(): string {
        return '.csv';
    }

    private static getFileTitle(): string {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();
        return `${month}-${day}-${year}` + this.getFileExtension();
    }

    private static getFormatedPuppetInfo(puppets: Puppet[]): string {
        let fileContent: string = 'name; totalTime; position; date\n';
        const statsPuppets = [...puppets];
        statsPuppets.sort((a, b) => {
            if (a.elapsedTime && b.elapsedTime)
                return (a.elapsedTime + a.interruptTime) - (b.elapsedTime + b.interruptTime)
            return 0;
        });
        statsPuppets
            .forEach((puppet, idx) => {
                if (puppet.elapsedTime) {
                    const totalTime: number = puppet.elapsedTime + puppet?.interruptTime;
                    const date = this.getFileTitle().replace(this.getFileExtension(), '');
                    fileContent += puppet.name + ';' + totalTime + ';' + (idx + 1) + ';' + date;
                    fileContent += '\n';
                }
            });
        return fileContent;
    }
}
