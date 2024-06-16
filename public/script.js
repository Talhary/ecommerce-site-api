
    const signinSection = document.getElementById('signin-section');
    const userInfoSection = document.getElementById('user-info-section');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const logoutBtn = document.getElementById('logout-btn');
  
    // Fetch user info on page load
    const url = new URL(window.location.href);

    // Extract the value of the 'token' parameter
    const token = url.searchParams.get("token");
    console.log(token)
    localStorage.setItem('token',token)
    console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token')){
      fetch('/auth/user')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.user) {
          showUserInfo(data.user);
        } else {
          showSignin();
        }
      });
    
    logoutBtn.addEventListener('click', () => {
      fetch(' /auth/logout')
        .then(() => {
          showSignin();
        });
    });
    
    }
    function showSignin() {
      signinSection.style.display = 'block';
      userInfoSection.style.display = 'none';
    }
  
    function showUserInfo(user) {
      userName.textContent = `Name: ${user.displayName}`;
      userEmail.textContent = `Email: ${user.email}`;
      signinSection.style.display = 'none';
      userInfoSection.style.display = 'block';
    }
 
  