import {withStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";
import {Button} from "@material-ui/core";

const RegisterButton = withStyles((theme) => ({
    root: {
        color: theme.palette.success.main,
        borderColor: fade(theme.palette.success.main, 0.6),
        '&:hover': {
            backgroundColor: fade(theme.palette.success.main, 0.05),
            borderColor: theme.palette.success.main,
        },
    },
}))(Button);

export default RegisterButton;