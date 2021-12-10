import { useCallback, useState } from "react";
const useForm = (initialState, onSubmit) => {
    const [form, setForm] = useState(initialState);
    const handleChange = useCallback((event) => {
        event.persist();
        setForm((form) => ({
            ...form,
            [event.target.name]:
                event.target.type === "checkbox" || event.target.type === "radio"
                    ? event.target.checked
                    : event.target.value,
        }));
    }, []);

    const resetForm = useCallback(() => {
        setForm(initialState);
    }, [initialState]);
    return {

        form,
        handleChange,
        resetForm,
        setForm,
    };

}

export default useForm