import { GraphQLNonNull } from 'graphql';
import BuyerModelType from '../../../models/buyer/buyer.model';
import buyerType, { buyerInputType } from './types';


export const buyerMutations = {
    createBuyer: {
        type: buyerType,
        args: {
            type: {
                input: new GraphQLNonNull(buyerInputType)
            }
        },
        resolve: (RootValue, { input }) => {
            const buyer = new BuyerModelType({
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                phoneNumber: input.phoneNumber,
                password: input.password,
                googleID: input.googleID,
                facebookID: input.facebookID,
                likedListings: input.likedListings,
                favoritedListings: input.favoritedListings
            });
            return buyer.save();
        }
    }
};