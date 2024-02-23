export const experienceSectionTemplate = `
<section>
    <h2 class="section-title text-section-title">{{title}}</h2>
    {{#each data}}
        <div class="experience">
            <h3 class="with-underline text-experience-title">
                <span style="font-weight: 500;">{{this.title}}</span><span class="separator"> - </span>{{this.subtitle}}
            </h3>
            <div class="experience-subinfo text-subtitle">
                <div class="experience-date">{{this.date}}</div>
                <div class="location">{{this.location}}</div>
            </div>
            <ul class="experience-list text-body">
                {{#with this}}
                    {{#each items}}
                        <li>{{this}}</li>
                    {{/each}}
                {{/with}}
            </ul>
        </div>
    {{/each}}
</section>
`;
