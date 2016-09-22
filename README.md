# Selenium Hub Utilities
> Set of utilities to measure performance of selenium tests.

### Select best hub for [BrowserStack Automate](https://browserstack.com/automate)
```
BROWSERSTACK_USERNAME=your_user_name BROWSERSTACK_ACCESS_KEY=your_access_key node index.js
```

> Running test with http://hub-us.browserstack.com. Please wait...    
> Time taken by http://hub-us.browserstack.com - 5948 ms    
> Running test with https://hub-us.browserstack.com. Please wait...    
> Time taken by https://hub-us.browserstack.com - 14325 ms    
> Running test with http://hub-us.browserstack.com:4444. Please wait...    
> Time taken by http://hub-us.browserstack.com:4444 - 13509 ms    
> Running test with http://hub-cloud-us.browserstack.com. Please wait...    
> Time taken by http://hub-cloud-us.browserstack.com - 17680 ms    
> Running test with https://hub-cloud-us.browserstack.com. Please wait...    
> Time taken by https://hub-cloud-us.browserstack.com - 40771 ms    
> --------------------------------------------------------------    
> ----------------------------REPORT----------------------------    
> -- http://hub-us.browserstack.com 5948 ms --    
> -- http://hub-us.browserstack.com:4444 13509 ms --    
> -- https://hub-us.browserstack.com 14325 ms --    
> -- http://hub-cloud-us.browserstack.com 17680 ms --    
> -- https://hub-cloud-us.browserstack.com 40771 ms --    
> --------------------------------------------------------------    
> > You can select the best hub endpoint according to report.
