const FirebaseReducer = (state , action) => {
    switch (action.type) {
        case "SET_PURCHASED_ITEMS":
            return {
                ...state,
                purchasedItems : action.payload         
            }
            break;
            case "USER_CREDENTIALS":
                return {
                    ...state,
                    userCredential : action.payload         
                }
                break;
            case "FETCHED_ITEMS":
                return {
                    ...state,
                    fetchedItems : action.payload         
                }
                break;
            case "MODIFING_PRODUCT":
                return {
                    ...state,
                    modifingProduct : action.payload         
                }
                break;
            default: 
            return{
                ...state,
            }
                break;

        }
    }

export default FirebaseReducer