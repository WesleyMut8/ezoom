    var header           = document.getElementById('header');
    var headerNavigation = document.getElementById('header-navigation');
    var content          = document.getElementById('main-content');
    var background       = document.getElementById('background');
    var showSidebar      = false;

    function toggleSidebar()
    {
        showSidebar = !showSidebar;
        if(showSidebar)
        {
            headerNavigation.style.marginLeft = '-10vw';
            headerNavigation.style.animationName = 'showSidebar';
            content.style.filter = 'blur(2px)';
            background.style.filter = 'blur(2px)';
        }
        else
        {
            headerNavigation.style.marginLeft = '-100vw';
            headerNavigation.style.animationName = 'closeSidebar';
            content.style.filter = '';
        }
    }

    function closeSidebar()
    {
        if(showSidebar)
        {
            showSidebar = true;
            toggleSidebar();
        }
    }

    window.addEventListener('resize', function(event) {
        if(window.innerWidth > 768 && showSidebar) 
        {  
            showSidebar = true;
            toggleSidebar();
        }
    });