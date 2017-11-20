export default (router) => {
    router.use('/user/auth', 'UserController');
    router.use('/login', 'UserController@login');
    router.use('/user', 'UserController@user');
}