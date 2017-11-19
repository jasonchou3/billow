export default (router) => {
    router.use('/user', 'UserController');
    router.use('/login', 'UserController@login');
}