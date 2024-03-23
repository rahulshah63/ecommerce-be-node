import App from '@/app';
import validateEnv from '@utils/validateEnv';
import AuthRoute from '@/modules/auth/auth.route';
import UserRoute from './modules/user/user.route';
import CategoryRoute from './modules/category/category.route';
import ProductRoute from './modules/product/product.route';
import OrderRoute from './modules/order/order.route';

validateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new CategoryRoute(), new ProductRoute(), new OrderRoute()]);

app.listen();
