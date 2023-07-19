import puppeteer from 'puppeteer';

async function getOpenPositions(department: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.actian.com/company/careers');

    // Extract the list of titles for open positions in the specified department
    const titles = await page.evaluate((department) => {
        const jobPostings = Array.from(document.querySelectorAll('.job-posting'));
        const departmentElement = jobPostings.find((jobPosting) => {
            const departmentElement = jobPosting.querySelector('.department');
            return departmentElement && departmentElement?.textContent?.trim() === department;
        });

        if (departmentElement) {
            const jobElements = departmentElement.querySelectorAll('.job-name');
            return Array.from(jobElements).map((jobElement) => jobElement?.textContent?.trim());
        }

        return [];
    }, department);


    return titles as string[];
}

export default {
    getOpenPositions,
};
