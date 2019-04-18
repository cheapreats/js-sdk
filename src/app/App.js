const CategoryController = require('./controllers/CategoryController');
const CustomerController = require('./controllers/CustomerController');
const CustomerTokenController = require('./controllers/CustomerTokenController');
const CouponController = require('./controllers/CouponController');
const EmployeeController = require('./controllers/EmployeeController');
const EmployeeTokenController = require('./controllers/EmployeeTokenController');
const GraphController = require('./controllers/GraphController');
const HeadOfficeController = require('./controllers/HeadOfficeController');
const MenuItemController = require('./controllers/MenuItemController');
const ModifierController = require('./controllers/ModifierController');
const VendorController = require('./controllers/VendorController');
const VerificationController = require('./controllers/VerificationController');
const ValidationController = require('./controllers/ValidationController');
const SurveyController = require('./controllers/SurveyController');
const OrderController = require('./controllers/OrderController');
const ImageController = require('./controllers/ImageController');
const PayoutController = require('./controllers/PayoutController');
const ExplorePageController = require('./controllers/ExplorePageController');
const strToIdentifier =  require('./util/strToIdentifier');
let packageDotJson = require('../../package.json');

const CheaprEatsGraphQLAdaptor = require('./adaptors/CheaprEatsGraphQLAdaptor');

let config = {
    endpoints: require('../config/endpoints')
};

/**
 * Main entry point of the SDK
 */
class App {

    /**
     * Construct the App instance.
     * @hideconstructor
     */
    constructor() {
        this._token = null;

        this._adaptor = new CheaprEatsGraphQLAdaptor({
            graphQLEndpoint: this.getConfiguration().endpoints.graphQLEndpoint.production
        });

        this._categoryController = new CategoryController(this);
        this._customerController = new CustomerController(this);
        this._customerTokenController = new CustomerTokenController(this);
        this._couponController = new CouponController(this);
        this._employeeController = new EmployeeController(this);
        this._employeeTokenController = new EmployeeTokenController(this);
        this._graphController = new GraphController(this);
        this._headOfficeController = new HeadOfficeController(this);
        this._menuItemController = new MenuItemController(this);
        this._modifierController = new ModifierController(this);
        this._vendorController = new VendorController(this);
        this._verificationController = new VerificationController(this);
        this._validationController = new ValidationController(this);
        this._surveyController = new SurveyController(this);
        this._orderController = new OrderController(this);
        this._imageController = new ImageController(this);
        this._payoutController = new PayoutController(this);
        this._explorePageController = new ExplorePageController(this);
    }

    /**
     * Get category related methods.
     * @returns {{create: CategoryController.create, delete: CategoryController.delete, update: CategoryController.update}}
     */
    get Category() {
        return {
            create: this._categoryController.create,
            delete: this._categoryController.delete,
            update: this._categoryController.update
        };
    }

    /**
     * Get customer related methods.
     * @returns {{create: CustomerController.create, enrollApnsToken: CustomerController.enrollApnsToken, revokeApnsToken: CustomerController.revokeApnsToken, enrollFcmToken: CustomerController.enrollFcmToken, revokeFcmToken: CustomerController.revokeFcmToken, update: CustomerController.update, updateCreditCard: CustomerController.updateCreditCard, createWallet: CustomerController.createWallet, reloadWallet: CustomerController.reloadWallet, resetPassword: CustomerController.resetPassword, sendPasswordResetCode: CustomerController.sendPasswordResetCode, refundWallet: CustomerController.refundWallet, createWalletTransaction:CustomerController.createWalletTransaction, addFavouriteVendor:CustomerController.addFavouriteVendor, removeFavouriteVendor:CustomerController.removeFavouriteVendor, addFavouriteItem:CustomerController.addFavouriteItem, removeFavouriteItem:CustomerController.removeFavouriteItem}}
     */
    get Customer() {
        return {
            create: this._customerController.create,
            enrollApnsToken: this._customerController.enrollApnsToken,
            revokeApnsToken: this._customerController.revokeApnsToken,
            enrollFcmToken: this._customerController.enrollFcmToken,
            revokeFcmToken: this._customerController.revokeFcmToken,
            update: this._customerController.update,
            updateCreditCard: this._customerController.updateCreditCard,
            createWallet: this._customerController.createWallet,
            reloadWallet: this._customerController.reloadWallet,
            resetPassword: this._customerController.resetPassword,
            sendPasswordResetCode: this._customerController.sendPasswordResetCode,
            refundWallet: this._customerController.refundWallet,
            createWalletTransaction: this._customerController.createWalletTransaction,
            addFavouriteVendor: this._customerController.addFavouriteVendor,
            removeFavouriteVendor: this._customerController.removeFavouriteVendor,
            addFavouriteItem: this._customerController.addFavouriteItem,
            removeFavouriteItem: this._customerController.removeFavouriteItem
        };
    }

    /**
     * Get customer token related methods.
     * @returns {{create: CustomerTokenController.create}}
     */
    get CustomerToken() {
        return {
            create: this._customerTokenController.create
        };
    }

    /**
     * Get coupon related methods.
     * @returns {{create: CouponController.create}}
     */
    get Coupon() {
        return {
            create: this._couponController.create
        };
    }

    /**
     * Get employee related methods.
     * @returns {{create: EmployeeController.create, update: EmployeeController.update, delete: EmployeeController.delete, enrollTerminalFcm: EmployeeController.enrollTerminalFcm, revokeTerminalFcm: EmployeeController.revokeTerminalFcm, sendPasswordResetCode: EmployeeController.sendPasswordResetCode}}
     */
    get Employee() {
        return {
            create: this._employeeController.create,
            update: this._employeeController.update,
            delete: this._employeeController.delete,
            enrollTerminalFcm: this._employeeController.enrollTerminalFcm,
            revokeTerminalFcm: this._employeeController.revokeTerminalFcm,
            resetEmployeePassword: this._employeeController.resetEmployeePassword,
            sendPasswordResetCode: this._employeeController.sendPasswordResetCode,
        };
    }

    /**
     * Get employee token related methods.
     * @returns {{create: EmployeeTokenController.create}}
     */
    get EmployeeToken() {
        return {
            create: this._employeeTokenController.create
        };
    }

    /**
     * Get graph related methods.
     * @returns {{query: GraphController.query}}
     */
    get Graph() {
        return {
            query: this._graphController.query
        };
    }

    /**
     * Get menu item related methods.
     * @returns {{create: MenuItemController.create, update: MenuItemController.update, delete: MenuItemController.delete}}
     */
    get MenuItem() {
        return {
            create: this._menuItemController.create,
            update: this._menuItemController.update,
            batchUpdate: this._menuItemController.batchUpdate,
            delete: this._menuItemController.delete
        };
    }

    /**
     * Get modifier related methods.
     * @returns {{create: ModifierController.create, update: ModifierController.update, delete: ModifierController.delete}}
     */
    get Modifier() {
        return {
            create: this._modifierController.create,
            update: this._modifierController.update,
            delete: this._modifierController.delete
        };
    }

    /**
     * Get order related methods.
     * @returns {{create: OrderController.create, cancel: OrderController.cancel, beginPreparing: OrderController.beginPreparing, prepared: OrderController.prepared, complete: OrderController.complete}}
     */
    get Order() {
        return {
            create: this._orderController.create,
            cancel: this._orderController.cancel,
            beginPreparing: this._orderController.beginPreparing,
            prepared: this._orderController.prepared,
            complete: this._orderController.complete
        };
    }

    /**
     * Get head office related methods.
     * @returns {{create: HeadOfficeController.create, update: HeadOfficeController.update, delete: HeadOfficeController.delete}}
     */
    get HeadOffice() {
        return {
            create: this._headOfficeController.create,
            update: this._headOfficeController.update,
            delete: this._headOfficeController.delete
        };
    }

    /**
     * Get verification services methods.
     * @returns {{startVerificationSession: VerificationController.startVerificationSession, checkVerificationSession: VerificationController.checkVerificationSession}}
     */
    get Verification() {
        return {
            startVerificationSession: this._verificationController.startVerificationSession,
            checkVerificationSession: this._verificationController.checkVerificationSession
        };
    }

    /**
     * Get vendor related methods.
     * @returns {{create: VendorController.create, createWithEmployee: VendorController.createWithEmployee, update: VendorController.update}}
     */
    get Vendor() {
        return {
            create: this._vendorController.create,
            createWithEmployee: this._vendorController.createWithEmployee,
            update: this._vendorController.update,
            updateAllMenuItemsStatus: this._vendorController.updateAllMenuItemsStatus
        };
    }

    /**
     * Get validation services methods.
     * @returns {{Customer: {signupEmail: ValidationController.customerSignupEmail, signupPhone: ValidationController.customerSignupPhone}}}
     */
    get Validation() {
        return {
            Customer: {
                signupEmail: this._validationController.customerSignupEmail,
                signupPhone: this._validationController.customerSignupPhone
            }
        };
    }

    /**
     * Get survey related methods
     */
    get Survey() {
        return {
            create: this._surveyController.create,
            update: this._surveyController.update,
            delete: this._surveyController.delete,
            release: this._surveyController.release,
            createSurveyResponse: this._surveyController.createSurveyResponse
        };
    }

    /**
     * Get image services methods.
     * @returns {{upload: ImageController.upload, getLink: ImageController.getLink}}
     */
    get Image() {
        return {
            upload: this._imageController.upload,
            getLink: this._imageController.getLink
        };
    }

    /**
     * Get utility methods.
     * @returns {{strToIdentifier: (*|(function(): result))}}
     */
    get Util() {
        return {
            strToIdentifier
        };
    }

    /**
     * Get payout methods.
     * @returns {{request: PayoutController.request}}
     * @constructor
     */
    get Payout() {
        return {
            request: this._payoutController.request,
            update: this._payoutController.update,
            cancel: this._payoutController.cancel
        }
    }

    /**
     * Get explore page methods.
     * @returns {{replace: ExplorePageController.replace}}
     * @constructor
     */
    get ExplorePage() {
        return {
            replace: this._explorePageController.replace
        }
    }

    /**
     * Get current network adaptor instance
     * @returns {CheaprEatsGraphQLAdaptor}
     */
    getAdaptor() {
        return this._adaptor;
    }

    /**
     * Get Configuration
     * @returns {{endpoints: ({graphQLEndpoint: {production: string}, verificationEndpoint: {production: string}, validationEndpoint: {production: string}, imageEndpoint: {production: string, distribution: string}}|{graphQLEndpoint, verificationEndpoint, validationEndpoint, imageEndpoint})}}
     */
    getConfiguration() {
        return config;
    }

    /**
     * Set current authentication token
     * @param token
     */
    setAuthenticationToken(token) {
        this._token = token;
        this._adaptor.setAuthenticationToken(token);
    }

    /**
     * Get current authentication token
     * @returns {null|string}
     */
    getAuthenticationToken() {
        return this._token;
    }

    /**
     * Determine if current SDK Version in compatible
     * @returns {null|boolean}
     */
    isCompatible() {
        const sdkVersion = packageDotJson.version;
        let queryString = `
            query {
                is_sdk_version_supported(version:"${sdkVersion}")
            }
        `;
        return new Promise((resolve, reject) => {
            this.Graph.query(queryString).then(data => {
                resolve(data.is_sdk_version_supported);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Set Apollo endpoint.
     * WARNING: END OF LIFE
     * Please use setGraphQLEndpointInstead
     * @deprecated
     * @param endpoint
     */
    setApolloEndpoint(endpoint) {
        this.setGraphQLEndpoint(endpoint);
    }

    /**
     * Set GraphQL endpoint.
     * @param endpoint
     */
    setGraphQLEndpoint(endpoint) {
        config.endpoints.graphQLEndpoint.production = endpoint;
        this._adaptor = new CheaprEatsGraphQLAdaptor({
            graphQLEndpoint: this.getConfiguration().endpoints.graphQLEndpoint.production
        });
    }

    /**
     * Set verificationEndpoint.production
     * @param endpoint
     */
    setVerificationEndpoint(endpoint) {
        config.endpoints.verificationEndpoint.production = endpoint;
    }

    /**
     * Set validationEndpoint.production
     * @param endpoint
     */
    setValidationEndpoint(endpoint) {
        config.endpoints.validationEndpoint.production = endpoint;
    }

    /**
     * Set imageEndpoint.production
     * @param endpoint
     */
    setImageEndpoint(endpoint) {
        config.endpoints.imageEndpoint.production = endpoint;
    }

    /**
     * Set imageEndpoint.distribution
     * @param endpoint
     */
    setImageDistributionEndpoint(endpoint) {
        config.endpoints.imageEndpoint.distribution = endpoint;
    }
}

module.exports = App;
