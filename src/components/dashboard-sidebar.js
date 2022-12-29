import { useEffect, useState, useRef  } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery, Avatar } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Lock as LockIcon } from '../icons/lock';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { NavItem } from './nav-item';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MovieIcon from '@mui/icons-material/Movie';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';


const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Home'
  },
  {
    href: '/person',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Person'
  },
  {
    href: '/award',
    icon: (<EmojiEventsIcon fontSize="small" />),
    title: 'Award'
  },
  {
    href: '/content',
    icon: (<MovieIcon fontSize="small" />),
    title: 'Content'
  },
  {
    href: '/staff',
    icon: (<SupervisedUserCircleIcon fontSize="small" />),
    title: 'Staff'
  },
  {
    href: '/login',
    icon: (<LockIcon fontSize="small" />),
    title: 'Login'
  },
  {
    href: '/register',
    icon: (<UserAddIcon fontSize="small" />),
    title: 'Register'
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const settingsRef = useRef(null);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Heebum Park
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  Your tier
                  {' '}
                  : Administer
                </Typography>
              </div>
              <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.jpeg"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="Go to pro"
              src="/static/images/products/KOCOWA_BI_White.png"
            />
          </Box>
        </Box>
      </Box>
    </>
  );

  
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  

};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
