<section
  class="flex flex-col items-center justify-center mb-12 px-4 py-12"
  style="min-height: calc(100vh - 200px)"
>
  <div class="flex flex-col items-center mb-12">
    <div class="font-bold text-6xl text-gray-200">cv-gen</div>
  </div>
  <div class="flex flex-col items-center gap-2 mb-8">
    <p>A resume builder and viewer.</p>
    <p>Customizable, print-friendly, and simple.</p>
  </div>

  <div class="flex flex-row gap-4">
    <a href="/builder" class="px-4 py-1 bg-green-500/50 rounded">
      Build a resume
    </a>
    <a href="/load" class="px-4 py-1 bg-white/15 rounded">
      Load an existing resume
    </a>
  </div>
</section>
<section class="flex flex-col items-center mb-12 px-4 py-12 max-w-[500px]">
  <h1 class="text-3xl font-bold mb-8">How to use</h1>
  <div class="flex flex-col gap-4 text-center">
    <p>
      Start by building your resume with the builder. Save your resume in JSON
      format and host it somewhere (<a
        class="text-blue-500"
        href="https://github.com"
      >
        Github
      </a>
      or <a class="text-blue-500" href="https://jsonbin.io">jsonbin.io</a>).
    </p>

    <p>
      Place the URL leading to your JSON file into the
      <a class="text-blue-500" href="load">loader</a> to view it in a print-friendly
      website. You can then freely share the link for others to see.
    </p>
  </div>
</section>
