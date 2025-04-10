import { Component, createSignal, onMount, Show } from 'solid-js';
import styles from './popupaddress.module.css';
import closeIcon from '../img/X.svg';

interface PopupAddressProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (addressData: AddressData) => void;
    editAddress?: Address | null;
}

interface AddressData {
    recipient_name: string;
    phone_number: string;
    address: string;
    zip_code: string;
    is_default: boolean;
    address_type: AddressType;
}

type AddressType = 'home' | 'work' | 'school' | 'other';

interface Address extends AddressData {
    id: number;
    created_at: string;
}

const PopupAddress: Component<PopupAddressProps> = (props) => {
    // Reset semua state ketika popup dibuka atau editAddress berubah
    const [recipientName, setRecipientName] = createSignal('');
    const [phoneNumber, setPhoneNumber] = createSignal('');
    const [address, setAddress] = createSignal('');
    const [zipCode, setZipCode] = createSignal('');
    const [isDefault, setIsDefault] = createSignal(false);
    const [addressType, setAddressType] = createSignal<AddressType>('home');

    // Effect untuk mengisi form ketika editAddress berubah
    onMount(() => {
        if (props.editAddress) {
            setRecipientName(props.editAddress.recipient_name);
            setPhoneNumber(props.editAddress.phone_number);
            setAddress(props.editAddress.address);
            setZipCode(props.editAddress.zip_code);
            setIsDefault(props.editAddress.is_default);
            setAddressType(props.editAddress.address_type);
        } else {
            // Reset semua field untuk add new address
            setRecipientName('');
            setPhoneNumber('');
            setAddress('');
            setZipCode('');
            setIsDefault(false);
            setAddressType('home');
        }
    });

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        props.onSave({
            recipient_name: recipientName(),
            phone_number: phoneNumber(),
            address: address(),
            zip_code: zipCode(),
            is_default: isDefault(),
            address_type: addressType()
        });
    };

    return (
        <Show when={props.isOpen}>
            <div class={styles.overlay}>
                <div class={styles.popupContainer}>
                    <div class={styles.popupHeader}>
                        <h2>{props.editAddress ? 'Edit Address' : 'Add New Address'}</h2>
                        <button class={styles.closeButton} onClick={props.onClose}>
                            <img src={closeIcon} alt="Close" class={styles.closeIcon} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} class={styles.addressForm}>
                        <div class={styles.formGroup}>
                            <label for="recipientName">Recipient Name</label>
                            <input
                                type="text"
                                id="recipientName"
                                value={recipientName()}
                                onInput={(e) => setRecipientName(e.currentTarget.value)}
                                placeholder="Recipient Name"
                                required
                                minlength="3"
                            />
                        </div>

                        <div class={styles.formGroup}>
                            <label for="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber()}
                                onInput={(e) => setPhoneNumber(e.currentTarget.value)}
                                placeholder="Phone number"
                                required
                                pattern="[0-9]{10,15}"
                            />
                        </div>

                        <div class={styles.formGroup}>
                            <label for="address">Full Address</label>
                            <textarea
                                id="address"
                                value={address()}
                                onInput={(e) => setAddress(e.currentTarget.value)}
                                placeholder="Address Label, City and Sub-district"
                                rows={4}
                                required
                            />
                        </div>

                        <div class={styles.formGroup}>
                            <label for="zipCode">Zip Code</label>
                            <input
                                type="text"
                                id="zipCode"
                                value={zipCode()}
                                onInput={(e) => setZipCode(e.currentTarget.value)}
                                placeholder="Zip Code"
                                required
                            />
                        </div>


                        <div class={styles.checkboxGroup}>
                            <input
                                type="checkbox"
                                id="defaultAddress"
                                checked={isDefault()}
                                onChange={(e) => setIsDefault(e.currentTarget.checked)}
                            />
                            <label for="defaultAddress">Set as default</label>
                        </div>

                        <div class={styles.formActions}>
                            <button type="submit" class={styles.submitButton}>
                                {props.editAddress ? 'Save Changes' : 'Add Address'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Show>
    );
};

export default PopupAddress;