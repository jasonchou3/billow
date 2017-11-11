export default (router) => {
    router.use('/user', 'UserController');
    router.get('/user/index', 'UserController@index');
}