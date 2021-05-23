import {withStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";
import {Button} from "@material-ui/core";

const HeaderButton = withStyles(() => ({
    root: {
        color: 'white',
        borderColor: 'white',
        '&:hover': {
            backgroundColor: fade('#fff', 0.1),
            borderColor: 'white',
        },
    },
}))(Button);

export {HeaderButton};
