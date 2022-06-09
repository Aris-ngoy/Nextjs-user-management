export const textValidation = (text:string) => ({
    required: `Your ${text} is required.`,
    pattern : {
        value :  /^[a-zA-Z0-9\s]*$/,
        message : 'Only letters and numbers are allowed'   
    },
    minLength: {
        value: 2,
        message: `Your ${text} is too short.`
    }
})

//email validation
export const emailValidation = {
    required: 'Your email is required.',
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address.'
    }
}
//phone validation
export const phoneValidation = {
    required: 'Your phone number is required.',
    pattern: {
        value: /^[0-9]{10}$/,
        message: 'Invalid phone number.'
    }
}



export const passwordValidPattern = {
    required: "Your password is required.",
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: "Password must contain: Uppercase characters (A–Z), Lowercase characters (a–z), Numbers (0-9), Non-alphanumeric characters (!, $, #, %, =, ?)"
    },
    minLength: {
        value: 5,
        message: "Your password is too short."
    }
}