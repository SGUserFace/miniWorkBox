/*All Bundle*/





if ('serviceWorker' in navigator)
{
    window.addEventListener('load', () =>
    {
        navigator.serviceWorker.register('./service-worker.js')
        .then((registration) =>
        {
            // Registration was successful
            console.log('Service Worker registration successful with scope: ', registration.scope);
        }, (error) =>
        {
            // Registration failed
            console.log('Service Worker registration failed: ', error);
        });
    });
}
else
{
    console.log('Service Worker are not supported.');
}