export function getSignInPageHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign In - The Client Brief</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"><\/script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            border: "hsl(214.3, 31.8%, 91.4%)",
            input: "hsl(214.3, 31.8%, 91.4%)",
            background: "hsl(0, 0%, 100%)",
            foreground: "hsl(222.2, 84%, 4.9%)",
            primary: { DEFAULT: "hsl(222.2, 47.4%, 11.2%)", foreground: "hsl(210, 40%, 98%)" },
            secondary: { DEFAULT: "hsl(210, 40%, 96.1%)", foreground: "hsl(222.2, 47.4%, 11.2%)" },
            muted: { DEFAULT: "hsl(210, 40%, 96.1%)", foreground: "hsl(215.4, 16.3%, 46.9%)" },
            accent: { DEFAULT: "hsl(210, 40%, 96.1%)", foreground: "hsl(222.2, 47.4%, 11.2%)" },
          },
        },
      },
    }
  <\/script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      background: hsl(0, 0%, 100%);
      color: hsl(222.2, 84%, 4.9%);
      overflow: hidden;
      height: 100dvh;
      width: 100dvw;
    }

    /* Film grain overlay */
    .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%25" height="100%25" filter="url(%23noiseFilter)"/></svg>');
    }

    /* Subtle grid */
    .bg-grid {
      background-size: 60px 60px;
      background-image:
        linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    }

    /* 3D matte text */
    .text-3d-matte {
      text-shadow: 0 10px 30px rgba(15,23,42,0.15), 0 2px 4px rgba(15,23,42,0.08);
    }

    /* Silver gradient text */
    .text-silver {
      background: linear-gradient(180deg, hsl(222.2, 84%, 4.9%) 0%, rgba(15,23,42,0.35) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: drop-shadow(0px 10px 20px rgba(15,23,42,0.12)) drop-shadow(0px 2px 4px rgba(15,23,42,0.08));
    }

    /* Glass input */
    .glass-input {
      border-radius: 1rem;
      border: 1px solid hsl(214.3, 31.8%, 91.4%);
      background: hsla(222.2, 84%, 4.9%, 0.03);
      backdrop-filter: blur(4px);
      transition: border-color 0.3s, background-color 0.3s, box-shadow 0.3s;
    }
    .glass-input:focus-within {
      border-color: rgba(167, 139, 250, 0.6);
      background: rgba(139, 92, 246, 0.06);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.08);
    }

    input[type="text"], input[type="email"], input[type="password"] {
      outline: none; border: none; background: transparent;
      width: 100%; font-size: 0.875rem; padding: 1rem; border-radius: 1rem;
      color: hsl(222.2, 84%, 4.9%);
    }
    input::placeholder { color: hsl(215.4, 16.3%, 46.9%); }

    /* Checkbox */
    .custom-checkbox {
      appearance: none; width: 18px; height: 18px;
      border: 2px solid hsl(214.3, 31.8%, 91.4%); border-radius: 5px;
      cursor: pointer; position: relative; transition: all 0.15s;
    }
    .custom-checkbox:checked {
      background: hsl(222.2, 47.4%, 11.2%);
      border-color: hsl(222.2, 47.4%, 11.2%);
    }
    .custom-checkbox:checked::after {
      content: ''; position: absolute; left: 5px; top: 1px;
      width: 5px; height: 10px; border: solid white;
      border-width: 0 2px 2px 0; transform: rotate(45deg);
    }

    /* Status messages */
    .status-msg { text-align: center; padding: 0.75rem; border-radius: 1rem; font-size: 0.875rem; display: none; }
    .status-msg.error { display: block; background: hsla(0,84.2%,60.2%,0.1); color: hsl(0,84.2%,60.2%); border: 1px solid hsla(0,84.2%,60.2%,0.2); }
    .status-msg.success { display: block; background: hsla(142,76%,36%,0.1); color: hsl(142,76%,36%); border: 1px solid hsla(142,76%,36%,0.2); }
    .status-msg.info { display: block; background: hsla(217,91%,60%,0.1); color: hsl(217,91%,60%); border: 1px solid hsla(217,91%,60%,0.2); }

    /* Spinner */
    .spinner { display: none; }
    .spinner.active { display: inline-block; }
    .spinner svg { animation: spin 1s linear infinite; width: 20px; height: 20px; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Hidden for GSAP reveal */
    .gsap-hide { opacity: 0; visibility: hidden; }
  </style>
</head>
<body>
  <div class="relative w-full h-full flex items-center justify-center overflow-hidden" style="perspective: 1500px;">
    <!-- Environment overlays -->
    <div class="film-grain" aria-hidden="true"></div>
    <div class="bg-grid absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true"></div>

    <!-- Full-screen centered content -->
    <div class="relative z-10 w-full max-w-md px-6">

      <!-- Animated title -->
      <div class="text-center mb-10">
        <h1 id="title-line1" class="gsap-hide text-3d-matte text-4xl md:text-5xl font-bold tracking-tight mb-2">
          Welcome to
        </h1>
        <h1 id="title-line2" class="gsap-hide text-silver text-4xl md:text-5xl font-extrabold tracking-tighter">
          The Client Brief
        </h1>
        <p id="subtitle" class="gsap-hide mt-4 text-sm" style="color: hsl(215.4, 16.3%, 46.9%);">
          Sign in to manage your clients
        </p>
      </div>

      <div id="status-message" class="status-msg"></div>

      <!-- Sign-in form -->
      <form id="signin-form" class="space-y-5">
        <div id="field-email" class="gsap-hide">
          <label class="text-sm font-medium" style="color: hsl(215.4, 16.3%, 46.9%);">Email Address</label>
          <div class="glass-input">
            <input id="email" type="email" placeholder="Enter your email address" required />
          </div>
        </div>

        <div id="field-password" class="gsap-hide">
          <label class="text-sm font-medium" style="color: hsl(215.4, 16.3%, 46.9%);">Password</label>
          <div class="glass-input">
            <div class="relative">
              <input id="password" type="password" placeholder="Enter your password" required style="padding-right: 3rem;" />
              <button type="button" id="toggle-password" style="position:absolute; inset: 0 0.75rem 0 auto; display:flex; align-items:center; background:none; border:none; cursor:pointer;">
                <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(215.4, 16.3%, 46.9%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                <svg id="eye-off-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(215.4, 16.3%, 46.9%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div id="field-remember" class="gsap-hide flex items-center justify-between text-sm">
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" class="custom-checkbox" />
            <span style="color: hsla(222.2, 84%, 4.9%, 0.9);">Keep me signed in</span>
          </label>
        </div>

        <button type="submit" id="signin-btn" class="gsap-hide w-full rounded-2xl py-4 font-medium transition-all cursor-pointer" style="background: hsl(222.2, 47.4%, 11.2%); color: hsl(210, 40%, 98%); box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.2); border: none; font-size: 1rem;">
          <span id="signin-text">Sign In</span>
          <span id="signin-spinner" class="spinner"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg></span>
        </button>
      </form>

      <div id="divider" class="gsap-hide relative flex items-center justify-center my-6">
        <span class="w-full" style="border-top: 1px solid hsl(214.3, 31.8%, 91.4%);"></span>
        <span class="px-4 text-sm absolute" style="color: hsl(215.4, 16.3%, 46.9%); background: hsl(0, 0%, 100%);">Or</span>
      </div>

      <button id="create-account-btn" class="gsap-hide w-full flex items-center justify-center gap-3 rounded-2xl py-4 transition-all cursor-pointer" style="border: 1px solid hsl(214.3, 31.8%, 91.4%); background: transparent; font-size: 1rem;">
        Create Account
      </button>

      <p id="switch-mode" class="gsap-hide text-center text-sm mt-5" style="color: hsl(215.4, 16.3%, 46.9%); display: none;">
        Already have an account? <a href="#" id="switch-to-signin" style="color: #a78bfa;" class="hover:underline">Sign In</a>
      </p>
    </div>
  </div>

  <script>
    // --- GSAP Cinematic Entrance Animation ---
    var tl = gsap.timeline({ delay: 0.2 });

    // Title animations - cinematic reveal
    gsap.set('#title-line1', { opacity: 0, y: 60, scale: 0.85, filter: 'blur(20px)', rotationX: -20 });
    gsap.set('#title-line2', { opacity: 0, clipPath: 'inset(0 100% 0 0)' });
    gsap.set('#subtitle', { opacity: 0, y: 20, filter: 'blur(10px)' });

    // Form elements
    gsap.set(['#field-email', '#field-password', '#field-remember', '#signin-btn', '#divider', '#create-account-btn'], {
      opacity: 0, y: 30, filter: 'blur(8px)'
    });

    tl.to('#title-line1', {
      duration: 1.6, opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', rotationX: 0,
      ease: 'expo.out', visibility: 'visible'
    })
    .to('#title-line2', {
      duration: 1.2, opacity: 1, clipPath: 'inset(0 0% 0 0)',
      ease: 'power4.inOut', visibility: 'visible'
    }, '-=0.8')
    .to('#subtitle', {
      duration: 0.8, opacity: 1, y: 0, filter: 'blur(0px)',
      ease: 'power3.out', visibility: 'visible'
    }, '-=0.5')
    .to('#field-email', {
      duration: 0.7, opacity: 1, y: 0, filter: 'blur(0px)',
      ease: 'power3.out', visibility: 'visible'
    }, '-=0.3')
    .to('#field-password', {
      duration: 0.7, opacity: 1, y: 0, filter: 'blur(0px)',
      ease: 'power3.out', visibility: 'visible'
    }, '-=0.4')
    .to('#field-remember', {
      duration: 0.6, opacity: 1, y: 0, filter: 'blur(0px)',
      ease: 'power3.out', visibility: 'visible'
    }, '-=0.4')
    .to('#signin-btn', {
      duration: 0.7, opacity: 1, y: 0, filter: 'blur(0px)',
      ease: 'back.out(1.5)', visibility: 'visible'
    }, '-=0.3')
    .to('#divider', {
      duration: 0.5, opacity: 1, y: 0, filter: 'blur(0px)',
      ease: 'power3.out', visibility: 'visible'
    }, '-=0.3')
    .to('#create-account-btn', {
      duration: 0.6, opacity: 1, y: 0, filter: 'blur(0px)',
      ease: 'power3.out', visibility: 'visible'
    }, '-=0.3');

    // Hover effects on buttons
    var signinBtnEl = document.getElementById('signin-btn');
    signinBtnEl.addEventListener('mouseenter', function() {
      gsap.to(signinBtnEl, { y: -3, boxShadow: '0 6px 12px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.3)', duration: 0.4, ease: 'power2.out' });
    });
    signinBtnEl.addEventListener('mouseleave', function() {
      gsap.to(signinBtnEl, { y: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.2)', duration: 0.4, ease: 'power2.out' });
    });

    var createBtnEl = document.getElementById('create-account-btn');
    createBtnEl.addEventListener('mouseenter', function() {
      gsap.to(createBtnEl, { y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', duration: 0.3, ease: 'power2.out' });
    });
    createBtnEl.addEventListener('mouseleave', function() {
      gsap.to(createBtnEl, { y: 0, boxShadow: 'none', duration: 0.3, ease: 'power2.out' });
    });

    // --- Auth Logic ---
    var isSignUp = false;
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var signinText = document.getElementById('signin-text');
    var signinSpinner = document.getElementById('signin-spinner');
    var switchMode = document.getElementById('switch-mode');
    var switchToSignin = document.getElementById('switch-to-signin');
    var statusMsg = document.getElementById('status-message');

    // Toggle password visibility
    var showPw = false;
    document.getElementById('toggle-password').addEventListener('click', function() {
      showPw = !showPw;
      passwordInput.type = showPw ? 'text' : 'password';
      document.getElementById('eye-icon').style.display = showPw ? 'none' : 'block';
      document.getElementById('eye-off-icon').style.display = showPw ? 'block' : 'none';
    });

    function setLoading(loading) {
      signinBtnEl.disabled = loading;
      signinText.style.display = loading ? 'none' : 'inline';
      signinSpinner.classList.toggle('active', loading);
      signinBtnEl.style.opacity = loading ? '0.7' : '1';
    }

    function showStatus(message, type) {
      statusMsg.textContent = message;
      statusMsg.className = 'status-msg ' + type;
      gsap.fromTo(statusMsg, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
    }

    function clearStatus() {
      statusMsg.className = 'status-msg';
      statusMsg.textContent = '';
    }

    document.getElementById('signin-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var email = emailInput.value.trim();
      var password = passwordInput.value;
      if (!email || !password) {
        showStatus('Please enter your email and password.', 'error');
        return;
      }
      clearStatus();
      setLoading(true);
      if (isSignUp) {
        window.parent.postMessage({ type: 'signUp', email: email, password: password }, '*');
      } else {
        window.parent.postMessage({ type: 'signIn', email: email, password: password }, '*');
      }
    });

    createBtnEl.addEventListener('click', function() {
      isSignUp = true;
      signinText.textContent = 'Create Account';
      gsap.to(createBtnEl, { opacity: 0, height: 0, marginTop: 0, duration: 0.3, ease: 'power2.in', onComplete: function() { createBtnEl.style.display = 'none'; } });
      gsap.to('#divider', { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, duration: 0.3, ease: 'power2.in', onComplete: function() { document.getElementById('divider').style.display = 'none'; } });
      switchMode.style.display = 'block';
      gsap.fromTo(switchMode, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
      clearStatus();
    });

    switchToSignin.addEventListener('click', function(e) {
      e.preventDefault();
      isSignUp = false;
      signinText.textContent = 'Sign In';
      createBtnEl.style.display = 'flex';
      document.getElementById('divider').style.display = 'flex';
      gsap.fromTo(createBtnEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, height: 'auto', duration: 0.4, ease: 'power3.out' });
      gsap.fromTo('#divider', { opacity: 0 }, { opacity: 1, height: 'auto', duration: 0.3, ease: 'power3.out' });
      gsap.to(switchMode, { opacity: 0, duration: 0.2, onComplete: function() { switchMode.style.display = 'none'; } });
      clearStatus();
    });

    // Listen for auth results from parent
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'authError') {
        showStatus(e.data.message, 'error');
        setLoading(false);
      } else if (e.data && e.data.type === 'authSuccess') {
        showStatus(e.data.message, 'success');
        setLoading(false);
      } else if (e.data && e.data.type === 'signUpSuccess') {
        showStatus(e.data.message, 'info');
        setLoading(false);
      }
    });
  <\/script>
</body>
</html>`;
}
