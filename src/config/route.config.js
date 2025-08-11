import {
  DashboardSquare01Icon,
  CellsIcon,
  CheckmarkBadge04Icon,
  RankingIcon,
  Note04Icon,
  CancelCircleIcon,
  Notebook02Icon,
  CreditCardPosIcon,
  UserListIcon,
  UserStatusIcon,
  UserIcon,
  File02Icon,
  PromotionIcon,
  UserSwitchIcon,
  Edit01Icon,
  Delete02Icon,
  LockPasswordIcon
} from "hugeicons-react";

export const participantMenu = [
  {
    name: "Registration",
    link: `/participant/registration`,
    icon: <Notebook02Icon color="#000" />,
  },
  {
    name: "Payment History",
    link: `/participant/payment-details`,
    icon: <CreditCardPosIcon color="#000" />,
  },
  {
    name: "Change Password",
    link: `/request-password-change`,
    icon: <LockPasswordIcon color="#000" />,
  },
];
export const eventHeadMenu = [
  {
    name: "Dashboard",
    link: `/event-heads`,
    icon: <DashboardSquare01Icon color="#000" />,
  },
  {
    name: "Event Details",
    link: `/event-heads/event-details`,
    icon: <CellsIcon color="#000" />,
  },
  {
    name: "Update Scores",
    link: `/event-heads/update-scores`,
    icon: <CheckmarkBadge04Icon color="#000" />,
  },
  {
    name: "Rankings",
    link: `/event-heads/rankings`,
    icon: <RankingIcon color="#000" />,
  },
  {
    name: "Promote",
    link: `/event-heads/promote-participants`,
    icon: <PromotionIcon color="#000" />,
  },
  {
    name: "Registration Details",
    link: `/event-heads/registration-details`,
    icon: <Note04Icon color="#000" />,
  },
  {
    name: "Update Current Round",
    link: `/event-heads/update-current-round`,
    icon: <Edit01Icon color="#000" />,
  },
  {
    name: "Change Password",
    link: `/request-password-change`,
    icon: <LockPasswordIcon color="#000" />,
  },
];

export const superUserMenu = [
  {
    name: "Dashboard",
    link: `/superuser`,
    icon: <DashboardSquare01Icon color="#000" />,
  },
  {
    name: "Verify Payments",
    link: `/superuser/verify-payments`,
    icon: <CreditCardPosIcon color="#000" />,
  },
  {
    name: "Registration Details",
    link: `/superuser/registration-list`,
    icon: <Note04Icon color="#000" />,
  },
  {
    name: "Assign Team Names",
    link: `/superuser/assign-team-name`,
    icon: <UserSwitchIcon color="#000" />,
  },
  {
    name: "Create User",
    link: `/superuser/create-user`,
    icon: <UserIcon color="#000" />,
  },
  {
    name: "Create User Type",
    link: `/superuser/create-usertype`,
    icon: <UserListIcon color="#000" />,
  },
  {
    name: "Create Status",
    link: `/superuser/create-status`,
    icon: <UserStatusIcon color="#000" />,
  },
  {
    name: "Delete Registrations",
    link: `/superuser/delete-registration`,
    icon: <Delete02Icon color="#000" />,
  },
  {
    name: "Change Password",
    link: `/request-password-change`,
    icon: <LockPasswordIcon color="#000" />,
  },
];

export const adminMenuItems = [
  {
    name: 'Registrations',
    link: `/admin`,
    icon: <File02Icon color='#000' />,
  },
  {
    name: "Change Password",
    link: `/request-password-change`,
    icon: <LockPasswordIcon color="#000" />,
  },
];

export const accoMenuItems = [
  {
    name: 'Score Sheet',
    link: '/accolades/score-sheet',
    icon: <CheckmarkBadge04Icon color='#000' />
  },
  {
    name: "Change Password",
    link: `/request-password-change`,
    icon: <LockPasswordIcon color="#000" />,
  },
]


export const registrationMenu = [
  {
    name: "Registration List",
    link: `/registrations`,
    icon: <Note04Icon color="#000" />,
  },
  {
    name: "Assign Team Names",
    link: `/registrations/assign-team-name`,
    icon: <Edit01Icon color="#000" />,
  },
  {
    name: "Change Password",
    link: `/request-password-change`,
    icon: <LockPasswordIcon color="#000" />,
  },
]