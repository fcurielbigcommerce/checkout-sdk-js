import Consignment from './consignment';
import { InternalShippingOptionList } from './internal-shipping-option';
import mapToInternalShippingOption from './map-to-internal-shipping-option';

export default function mapToInternalShippingOptions(consignments: Consignment[]): InternalShippingOptionList {
    return consignments.reduce((result, consignment) => {
        let shippingOptions;

        if (consignment.availableShippingOptions) {
            shippingOptions = consignment.availableShippingOptions;
        } else {
            shippingOptions = consignment.selectedShippingOption ? [consignment.selectedShippingOption] : [];
        }

        return ({
            ...result,
            [consignment.id]: shippingOptions.map(option => {
                const selectedOptionId = consignment.selectedShippingOption && consignment.selectedShippingOption.id;

                return mapToInternalShippingOption(
                    option,
                    option.id === selectedOptionId
                );
            }),
        });
    }, {});
}
