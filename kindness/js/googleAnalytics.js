(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-33843970-2', 'auto');      
      setTimeout(function(){ 
        var page = $('#sonnyIcon').attr('analytics');
        analytics(page);        
      }, 5000);


function analytics(type){
    // temp send to index
    // $('.GooglePageName').html(type);
    // temp send to index
    ga('set', 'page', '/'+type+'.html');
    ga('send', 'pageview');
}