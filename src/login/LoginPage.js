import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  useMediaQuery,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  TextField,
  Link,
  Snackbar,
  IconButton,
  Tooltip,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sessionActions } from '../store';
import {
  useLocalization,
  useTranslation,
} from '../common/components/LocalizationProvider';
import LoginLayout from './LoginLayout';
import usePersistedState from '../common/util/usePersistedState';
import {
  handleLoginTokenListeners,
  nativeEnvironment,
  nativePostMessage,
} from '../common/components/NativeInterface';
import LogoImage from './LogoImage';
import { useCatch } from '../reactHelper';
import { setWithExpiry, getWithExpiry } from '../common/util/localstorage';
import ErrorDialog from '../common/components/ErrorDialog';

const useStyles = makeStyles((theme) => ({
  options: {
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  extraContainer: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  registerButton: {
    minWidth: 'unset',
  },
  resetPassword: {
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const t = useTranslation();

  const { languages, language, setLanguage } = useLocalization();
  const languageList = Object.entries(languages).map((values) => ({
    code: values[0],
    name: values[1].name,
  }));

  const [failed, setFailed] = useState(false);

  const [email, setEmail] = usePersistedState('loginEmail', '');
  const [password, setPassword] = useState('');
  const [opening, setOpening] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error !!");
  const languageEnabled = true;
  const emailEnabled = true;

  const handlePasswordLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_NAME}/session`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.ok) {
        const user = await response.json();
        setWithExpiry('TOKEN', user.token.data, user.token.expiresIn);
        dispatch(sessionActions.updateUser(user));
        navigate('/');
        return;
      }  if (response.status === 401) {
        setErrorMsg("UNAUTHORIZED");
        setOpening(true);
        //console.log("UNAUTHORIZED::", response.status);
        navigate("/login");
      } else {
        setErrorMsg(await response.text());
        setOpening(true);
        throw Error(await response.text());
      }
    } catch (error) {
      setFailed(true);
      setPassword('');
    }
  };

  const handleTokenLogin = useCatch(async (token) => {
    const response = await fetch(
      `/api/session?token=${encodeURIComponent(token)}`
    );
    if (response.ok) {
      const user = await response.json();
      dispatch(sessionActions.updateUser(user));
      navigate('/');
      return
    }  if (response.status === 401) {
      setErrorMsg("UNAUTHORIZED");
      setOpening(true);
      //console.log("UNAUTHORIZED::", response.status);
      navigate("/login");
    } else {
      setErrorMsg(await response.text());
      setOpening(true);
      throw Error(await response.text());
    }
  });

  const handleSpecialKey = (e) => {
    if (e.keyCode === 13 && email && password) {
      handlePasswordLogin(e);
    }
  };

 


  useEffect(() => nativePostMessage('authentication'), []);

  useEffect(() => {
    const listener = (token) => handleTokenLogin(token);
    handleLoginTokenListeners.add(listener);
    return () => handleLoginTokenListeners.delete(listener);
  }, []);
  const handleOpeningResult = (opening) => {
    setOpening(false);
    if (opening) {
    }
  };
  return (<>
    <LoginLayout    >
      <div className={classes.options}>
        {nativeEnvironment && (
          <Tooltip title={t('settingsServer')}>
            <IconButton onClick={() => navigate('/change-server')}>
              <LockOpenIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <div  className={classes.container}>
        {useMediaQuery(theme.breakpoints.down('lg')) && (
          <LogoImage color={theme.palette.primary.main} />
        )}
        <TextField
          required
          error={failed}
          label={t('userEmail')}
          name="email"
          value={email}
          autoComplete="email"
          autoFocus={!email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyUp={handleSpecialKey}
          helperText={failed && 'Invalid username or password'}
        />
        <TextField
          required
          error={failed}
          label={t('userPassword')}
          name="password"
          value={password}
          type="password"
          autoComplete="current-password"
          autoFocus={!!email}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={handleSpecialKey}
        />
        <Button
          onClick={handlePasswordLogin}
          onKeyUp={handleSpecialKey}
          variant="contained"
          color="secondary"
          disabled={!email || !password}
        >
          {t('loginLogin')}
        </Button>

        
      </div>
    </LoginLayout>
    <ErrorDialog
    style={{ transform: "none" }}
    open={opening}
    errorMsg={errorMsg}
    onResult={handleOpeningResult}
  />
  </>
  
  );
};

export default LoginPage;
 