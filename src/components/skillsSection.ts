export const skillsSectionTemplate = `
<section>
    <div class="skills-title-section">
        <h2 id="title-skills" class="section-title text-section-title">{{this.title}}</h2>
        <div class="skills-legend">
            <div id="label-rarely" class="skills-legend-label text-subtitle">rarely/past</div>
            <div class="skills-swatch">
                <div class="swatch" style="background: var(--color-skill-1)"></div>
                <div class="swatch" style="background: var(--color-skill-2)"></div>
                <div class="swatch" style="background: var(--color-skill-3)"></div>
                <div class="swatch" style="background: var(--color-skill-4)"></div>
                <div class="swatch" style="background: var(--color-skill-5)"></div>
            </div>
            <div id="label-often" class="skills-legend-label text-subtitle">often/current</div>
        </div>
    </div>
    <div class="skills-list text-body" id="skills-list">
        {{#each data}}
        <div class="skills-item">
            <div class="skills-level-box" style="background: var(--color-skill-{{this.level}})"></div>
            <div class="skills-label">{{this.name}}</div>
        </div>
        {{/each}}
    </div>
</section>
`;
