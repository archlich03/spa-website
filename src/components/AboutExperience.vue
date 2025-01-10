<script setup>
function getPresentMonths(startDateString) {
    const startDate = new Date(startDateString);
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
<ul class="timeline timeline-vertical timeline-compact">
    <li>
        <div class="timeline-middle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5">
                <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd" />
            </svg>
        </div>
        <div class="timeline-end timeline-box card w-full">
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
            </div>
        </div>
        <hr />
    </li>
    <li>
        <hr />
        <div class="timeline-middle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5">
                <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd" />
            </svg>
        </div>
        <div class="timeline-end timeline-box w-full">
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
            </div>
        </div>
        <hr />
    </li>
    <li>
        <hr />
        <div class="timeline-middle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5">
                <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd" />
            </svg>
        </div>
        <div class="timeline-end timeline-box w-full">
            <div class="card-body">
                <h4 class="card-title my-0 py-0">Specialist</h4>
                <p class="card-subtitle my-0 py-0">
                    <a href="https://vu.lt/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-medium hover:underline"
                        >
                        Vilnius University</a> 
                        · Part time<br><i>Oct 2024 - Present · {{ getPresentMonths('2024-10-01T00:00:00.000Z') }}</i></p>
            </div>
        </div>
    </li>
</ul>
</template>