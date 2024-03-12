<section
  class="flex flex-col items-center justify-center mb-12 px-4 py-12"
  style="min-height: calc(100vh - 120px)"
>
  <div class="flex flex-col items-center mb-8">
    <div class="font-bold text-6xl text-gray-200">cv-gen</div>
    <div class="mt-1 text-xs opacity-20 self-end">work in progress*</div>
  </div>
  <div class="flex flex-col items-center gap-2 mb-8">
    <p>A resume builder and viewer.</p>
    <p>
      Customizable<span class="opacity-40">*</span>, print-friendly, and simple.
    </p>
  </div>

  <div class="flex flex-row gap-4">
    <a href="/builder" class="px-4 py-1 !text-white bg-green-500/50 rounded">
      Build a resume
    </a>
    <a href="/load" class="px-4 py-1 !text-white bg-white/15 rounded">
      Load an existing resume
    </a>
  </div>
</section>
<section
  class="flex flex-col items-center justify-center mb-12 px-4 py-12 max-w-[500px] min-h-[50vh]"
>
  <h1 class="text-3xl font-bold mb-8">How to use</h1>
  <div class="flex flex-col gap-4 text-center">
    <p>
      Start by building your resume with the <a href="/builder">builder</a>.
      Save your resume in JSON format and host it somewhere (<a
        href="https://github.com"
      >
        Github
      </a>
      or <a href="https://jsonbin.io">jsonbin.io</a>).
    </p>

    <p>
      Place the URL leading to your JSON file into the
      <a href="load">loader</a> to view it in a print-friendly website. You can then
      freely share the link for others to see.
    </p>
  </div>
</section>
<section
  class="flex flex-col items-center justify-center mb-12 px-4 py-12 max-w-[500px] min-h-[50vh]"
>
  <h1 class="text-3xl font-bold mb-8">Current Limitations</h1>
  <div class="flex flex-col gap-4 text-center items-center">
    <p class="mb-4">
      This project is only a proof-of-concept improvement on my own existing
      resume template website, and it's still a work in progress. Some parts
      might feel missing, incomplete, or even janky to use. Things are moving
      very slowly as this is only a mini side-project of mine, so I hope you
      understand.
    </p>
    <p>To-dos:</p>
    <ul class="flex flex-col items-center gap-2">
      <li>Make more themes. We only have one usable theme at the moment.</li>
      <li>
        Friendlier options to save/load your resume, and also share your resume
        website.
      </li>
      <li>
        Better handling of JSON save state. Maybe spin up a database to make
        resume-saving easier.
      </li>
      <li>
        Increased variety of sections and also different ways to visualize and
        represent your skills, experiences, etc.
      </li>
      <li>More icon selections.</li>
      <li>Make sections rearrangable.</li>
      <li>Mock resume generator.</li>
      <li>Tips and suggestions when you're out of ideas.</li>
    </ul>
  </div>
</section>
<section
  class="flex flex-col items-center justify-center mb-12 px-4 py-12 max-w-[500px] min-h-[50vh]"
>
  <div class="flex flex-col gap-1 text-center">
    <div>made by <a href="https://johnrengwu.com">rengwu</a></div>
    <div>
      <a href="https://github.com/johngohrw/cv-gen">project repository</a>
    </div>
  </div>
</section>

<style>
  a {
    color: rgb(59 130 246);
  }
  li {
    list-style-type: disc;
  }
</style>
