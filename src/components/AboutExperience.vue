<script setup>
function getPresentMonths() {
    const startDate = new Date('2024-10-01T00:00:00.000Z');
    const endDate = new Date();
    const diffTime = endDate.getTime() - startDate.getTime();
    let diffMonths = Math.ceil(diffTime / (30 * 24 * 60 * 60 * 1000));
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    if (years === 0) {
        return months + (months === 1 ? " mo" : " mos");
    } else if (months === 0) {
        return years + (years === 1 ? " yr" : " yrs");
    } else {
        return years + (years === 1 ? " yr " : " yrs ") + months + (months === 1 ? " mo" : " mos");
    }
}
</script>

<template>
<ul class="timeline timeline-vertical">
    <li>
        <div class="timeline-start timeline-box card">
            <div class="card-body">
                <h4 class="card-title my-0 py-0">Customer Success Specialist</h4>
                <p class="card-subtitle my-0 py-0">
                    <a href="https://hostinger.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-medium hover:underline"
                        >
                        Hostinger</a> 
                        · Part time<br><i>Oct 2023 - Jun 2024 · 9 mos</i></p>
                <ul class="list-disc list-inside">
                    <li>"A" grade specialist for 6 months in a row;</li>
                    <li>Provided support for the Hostinger/Zyro Web Builder product;</li>
                    <li>Taught clients the basics of SEO;</li>
                    <li>Leading shifts (delegating tasks, answering queries about product from other teams);</li>
                    <li>Provided constant feedback to product team about most requested features for the product.</li>
                </ul>
            </div>
        </div>
        <hr />
    </li>
    <li>
        <hr />
        <div class="timeline-end timeline-box">
            <div class="card-body">
                <h4 class="card-title my-0 py-0">Information Technology Administrator</h4>
                <p class="card-subtitle my-0 py-0">
                    <a href="https://teltonika-gps.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-medium hover:underline"
                        >
                        Teltonika Telematics</a>
                        · Internship<br><i>Jul 2024 - Aug 2024 · 2 mos</i></p>
                <ul class="list-disc list-inside">
                    <li>Prepared new workstations by installing and configuring operating systems, applications;</li>
                    <li>Resolved basic hardware and software queries;</li>
                    <li>Reviewed and provided suggestions for company policies, ensuring accurate translations and optimal document layout.</li>
                </ul>
            </div>
        </div>
        <hr />
    </li>
    <li>
        <hr />
        <div class="timeline-start timeline-box">
            <div class="card-body">
                <h4 class="card-title my-0 py-0">Specialist</h4>
                <p class="card-subtitle my-0 py-0">
                    <a href="https://vu.lt/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-medium hover:underline"
                        >
                        Vilnius University</a> 
                        · Part time<br><i>Oct 2024 - Present · {{ getPresentMonths() }}</i></p>
                <ul class="list-disc list-inside">
                    <li>Implementation of tasks in project
                        <a 
                            href="https://www.knf.vu.lt/en/gaiso"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:underline"
                            >
                            "Research on Cyber Resilience Through Application of Generative Artificial Intelligence in Chief Information Security Officer Operations"
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </li>
</ul>
</template>