
// You can attach this to a form or button later
// auth.js
/*const supabase = supabase.createClient('https://ztnldcowmuhldurztvad.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0bmxkY293bXVobGR1cnp0dmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODE0OTksImV4cCI6MjA3MDA1NzQ5OX0.6U_BxibjiCK6p1xMgFyCd1nokaCUoetU_qWwEQ_YkQE');
window.supabase = supabase; 
async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    console.log('Login success:', data);
    alert('Login successful');
    window.location.href = "/furryfriends.html"; // redirect on success
  } catch (err) {
    console.error('Login error:', err.message);
    alert('Login failed: ' + err.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('boxtoauth');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    login(email, password);
  });
});*/
// auth.js
/*window.supabase = supabase.createClient(
  'https://ztnldcowmuhldurztvad.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0bmxkY293bXVobGR1cnp0dmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODE0OTksImV4cCI6MjA3MDA1NzQ5OX0.6U_BxibjiCK6p1xMgFyCd1nokaCUoetU_qWwEQ_YkQE'
);

// Only handle login if login form exists
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('boxtoauth');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      const password = form.password.value.trim();

      try {
        const { data, error } = await window.supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        alert('Login successful');
        window.location.href = "/furryfriends.html";
      } catch (err) {
        alert('Login failed: ' + err.message);
      }
    });
  }
});*/
// Initialize Supabase client — keep your own URL and anon key
/*const supabaseUrl = 'https://ztnldcowmuhldurztvad.supabase.co';
const supabaseKey = 'YOUR_ANON_PUBLIC_KEY';  // replace this with your anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('boxtoauth');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.querySelector('#id').value.trim();
    const email = form.querySelector('#email').value.trim();
    const password = form.querySelector('#password').value;

    if (!username || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    // Sign up user with email & password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/login.html' // optional redirect after email verify
      }
    });

    if (error) {
      alert('Signup error: ' + error.message);
      return;
    }

    alert('Signup successful! Please check your email to verify your account.');

    // Insert username to profiles table with user id
    const userId = data.user.id;
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: userId,
        username: username,
        score: 0,
        attempts: 0,
        level: 1,
        total_time_seconds: 0
      },
    ]);

    if (profileError) {
      alert('Error creating profile: ' + profileError.message);
      return;
    }

    alert('Profile created! You can now log in.');
    window.location.href = '/login.html';  // redirect to login or homepage
  });
});*/
// auth.js

// Initialize Supabase client once and globally
/*window.supabase = supabase.createClient('https://ztnldcowmuhldurztvad.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0bmxkY293bXVobGR1cnp0dmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODE0OTksImV4cCI6MjA3MDA1NzQ5OX0.6U_BxibjiCK6p1xMgFyCd1nokaCUoetU_qWwEQ_YkQE');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('boxtoauth');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    try {
      // Try login first
      const { data, error } = await window.supabase.auth.signInWithPassword({ email, password });

      if (error) {
        // If login fails due to invalid credentials, try sign-up
        if (error.message === 'Invalid login credentials') {
          const { data: signUpData, error: signUpError } = await window.supabase.auth.signUp({ email, password });

          if (signUpError) throw signUpError;

          alert('Sign-up successful! Please check your email to verify your account.');
          return;
        }
        throw error; // Other errors just throw
      }

      alert('Login successful!');
      window.location.href = "/furryfriends.html";

    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  });
});
*/
window.supabase = supabase.createClient(
  'https://ztnldcowmuhldurztvad.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0bmxkY293bXVobGR1cnp0dmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODE0OTksImV4cCI6MjA3MDA1NzQ5OX0.6U_BxibjiCK6p1xMgFyCd1nokaCUoetU_qWwEQ_YkQE'
);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('boxtoauth');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.id.value.trim();      // This is your custom user ID
    const password = form.password.value.trim();

    if (!username || !password) {
      alert("Please fill in both ID and password");
      return;
    }

    // Generate fake email (Supabase requires email format)
    const fakeEmail = `user_${username}@letusq.com`;

    try {
      // Try to sign up
      const { data: signUpData, error: signUpError } = await window.supabase.auth.signUp({
        email: fakeEmail,
        password: password
      });

      if (signUpError) {
        // If already registered, try login
        if (signUpError.message.includes("User already registered")) {
          const { data: signInData, error: signInError } = await window.supabase.auth.signInWithPassword({
            email: fakeEmail,
            password: password
          });

          if (signInError) throw signInError;

          alert("Login successful!");
          window.location.href = "/furryfriends.html";
          return;
        }

        throw signUpError;
      }

      alert("Sign-up successful!");

      // Insert into profiles table (ONLY ON SIGNUP)
      const userId = signUpData.user.id;

      const { error: insertError } = await window.supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            username: username,  // ⚠️ Warning: Storing password in plaintext is insecure
            score: 0,
            time_spent: 0,
            instance_created: new Date().toISOString()
          }
        ]);

      if (insertError) {
        throw new Error("Failed to save profile: " + insertError.message);
      }

      // Redirect
      window.location.href = "/furryfriends.html";

    } catch (error) {
      console.error("❌ Auth error:", error.message);
      alert("Login failed: " + error.message);
    }
  });
});


