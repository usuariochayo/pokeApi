import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    paper: {
        width: 240
    },
    div: {
        padding: 20,
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        height: 60,
        marginLeft: 30,
        marginRight: 'auto'
    },
    footer: {
        bottom: 0,
        position: 'fixed',
        width: '100%'
    },
    container: {
        marginTop: theme.spacing(15)
    },
    card: {
        maxWidth: 350,
        background: 'linear-gradient(45deg, #555555 1%, #fa4454 50%)'
    },
    imagePoke: {
        height: 250
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    paperSearch: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        borderRadius: 16,
        width: '40%'
    },
}))