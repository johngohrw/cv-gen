export const contactItemTemplate = `
<div class="contact-item">
    <img src="{{this.icon}}" class="contact-icon" />
    <div class="contact-label text-contact-item">
    {{#if href}}
        <a id="" href="{{this.href}}" target="_blank">{{this.label}}</a>
    {{else}}
        {{this.label}}
    {{/if}}
    </div>
</div>
`;
