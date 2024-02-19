const App = () => {
  return (
    <div>
      <h1>React in GitHub template (RiGHt👉)</h1>
      <p>
        This is a React + Vite PWA template running for starting a new project.
        It&#39;s made for GitHub (CI/CD with GH Actions + publish with GH
        Pages).
      </p>
      <h2>Setup</h2>
      <h3>Clone the repo</h3>
      <pre>
        <code className="language-shell">
          git clone https://github.com/nmerget/right.git my-awesome-project # or
          git clone git@github.com:nmerget/right.git my-awesome-project
        </code>
      </pre>
      <h3>Install dependencies</h3>
      <p>
        <code>npm install</code>
      </p>
      <h3>Rename the default repo</h3>
      <p>
        <code>
          node scripts/rename.js -n \&quot;My Awesome Project\&quot; -sn
          my-awesome-project
        </code>
      </p>
      <h3>Add a custom app icon</h3>
      <p>
        Replace the <code>public/app-icon.png</code> with an own icon and run{" "}
        <code>npm run generate:manifest-icons</code>
      </p>
      <h3>Update manifest</h3>
      <p>
        Goto <code>manifest.ts</code> and change the config by your preferences.
        For more information look at{" "}
        <a href="https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html#web-app-manifest">
          this
        </a>
        .
      </p>
      <h3>Start coding</h3>
      <p>
        All your setup is done. Run <code>npm run dev</code> and start writing
        code inside the <code>src</code> folder.
      </p>
      <h2>Configure in GitHub</h2>
      <ol>
        <li>Create a new repo in GH and change the origin</li>
        <li>
          Your default branch should be <code>main</code> so the pipeline works
          out of the box
        </li>
        <li>
          Goto <code>Settings/Actions/General</code> and activate{" "}
          <code>Read and write permission</code> otherwise some of the jobs of
          the ci wouldn&#39;t work{" "}
          <img src="write-permissions.png" alt="Write-permissions" />
        </li>
        <li>
          Push an <code>Initial commit</code> to your repo and the pipeline
          should trigger the GitHug Pages publish
        </li>
      </ol>
      <h3>Recommendations</h3>
      <p>
        Enable <code>Allow auto-merge</code> and{" "}
        <code>Automatically delete head branches</code> inside{" "}
        <code>Settings/General</code>
      </p>
      <p>
        <img src="auto-merge.png" alt="Auto-merge" />
      </p>
      <p>
        Enable branch protection for <code>main</code> under{" "}
        <code>Settings/Branches</code>. These settings are only available after
        pushing at least 1 commit to the repo
      </p>
      <p>
        <img src="branch-protection.png" alt="branch-protection" />
      </p>
    </div>
  );
};

export default App;
