
module.exports.configureEndpoints = function (app, passport) {
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }



    // root
    app.get('/', function (req, res) {
        res.render('index', { user: req.user });
    });

    // accout info - requires authenticated user
    app.get('/account', ensureAuthenticated, function (req, res) {
        res.render('account', { user: req.user });
    });

    // login
    app.get('/login', function (req, res) {
        res.render('login', { user: req.user });
    });

    // initiates auth sequence with Azure
    app.get('/auth/waad', passport.authenticate('oauth2'));

    // callback from Azure to complete auth sequence
    app.get('/auth/waad/callback', passport.authenticate('oauth2', { failureRedirect: '/login' }),
      function (req, res) {
          res.redirect('/');
      });

    // logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/mail', ensureAuthenticated, function (req, res) {
        // console.log('req', req);

        console.log('req.user', req.user);

        var options = {
            url: 'http://outlook.office365.com/api/v1.0/me/messages',
            headers: {
                Authorization : { 'bearer' : req.user.accessToken },
                Accept: 'application/json;odata.metadata=none'
            }

        }
        require('request').get(
            options,
            function (error, response, body) {
                if (error) {
                    console.log('error', error);
                    next(error);
                }
                else {
                    console.log('body', body);
                    // data = { user: passport.user, msgs: JSON.parse(body)['value'] };
                    // res.render('mail', { data: data });
                }
            }
        );
    });
};
