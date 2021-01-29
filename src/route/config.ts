import React, { lazy } from 'react';

const User = lazy(() => import('@/views/user'));
const Preparation = lazy(() => import('@/views/preparation'))
const Center = lazy(() => import('@/views/center'));
const Tkt = lazy(() => import('@/views/tkt'));
const Corrigendum = lazy(() => import('@/views/corrigendum'));
const Setting = lazy(() => import('@/views/setting'));
const Feedback = lazy(() => import('@/views/setting/components/feedback'));
const PhoneLogin = lazy(() => import('@/views/login/phone'));
const EntryLogin = lazy(() => import('@/views/login/entry'));
const ExamIntroducedList = lazy(() => import('@/views/exam_introduced/list'));
const ExamIntroducedDetail = lazy(() => import('@/views/exam_introduced/detail'));
const NewsDetail = lazy(() => import('@/views/exam_introduced/newsDetail'));
const Spoken = lazy(() => import('@/views/spoken'));

const ExamReminders = lazy(() => import('@/views/exam_reminders'));
const SignUpGuide = lazy(() => import('@/views/sign_up/guide'));
const SignUpProcess = lazy(() => import('@/views/sign_up/process'));
const Certificate = lazy(() => import('@/views/certificate'));
const ResultsInquire = lazy(() => import('@/views/results/inquire'));
const ResultAnalyse = lazy(() => import('@/views/results/analyse'));
const ResultReconsider = lazy(() => import('@/views/results/reconsider'));
const ExamManagement = lazy(() => import('@/views/exam_management'));
const ExamNavigation = lazy(() => import('@/views/exam_navigation'));
const Reconsideration = lazy(() => import('@/views/reconsideration'));
const Pay = lazy(() => import('@/views/pay'));
const About = lazy(() => import('@/views/setting/components/about'));
const Preference = lazy(() => import('@/views/setting/components/preference'))
const Order = lazy(() => import('@/views/order'));
const NotFind = lazy(() => import('@/views/not_find'));

interface meta {
    title: string
}
interface configItem {
    path: string;
    meta: meta;
    component: any
}

const routeConfig: configItem[] = [
    {
        path: '/user',
        component: User,
        meta: {
            title: '用户'
        }
    },
    {
        path: '/center',
        component: Center,
        meta: {
            title: '北外考生'
        }
    },
    {
        path: '/setting',
        component: Setting,
        meta: {
            title: '设置'
        }
    },
    {
        path: '/setting/feedback',
        component: Feedback,
        meta: {
            title: '意见反馈'
        }
    },
    {
        path: '/setting/about',
        component: About,
        meta: {
            title: '关于我们'
        }
    },
    {
        path: '/login/phone',
        component: PhoneLogin,
        meta: {
            title: '手机号登录'
        }
    },
    {
        path: '/exam/introduced/list',
        component: ExamIntroducedList,
        meta: {
            title: '介绍'
        }
    },
    {
        path: '/exam/introduced/detail',
        component: ExamIntroducedDetail,
        meta: {
            title: '详情'
        }
    },
    {
        path: '/exam/news/detail',
        component: NewsDetail,
        meta: {
            title: '最新消息'
        }
    },
    {
        path: '/exam/reminders',
        component: ExamReminders,
        meta: {
            title: '考试提醒'
        }
    },
    {
        path: '/spoken',
        component: Spoken,
        meta: {
            title: '考培'
        }
    },
    {
        path: '/tkt',
        component: Tkt,
        meta: {
            title: 'TKT'
        }
    },
    {
        path: '/preparation',
        component: Preparation,
        meta: {
            title: '备考指南'
        }
    },
    {
        path: '/signup/guide',
        component: SignUpGuide,
        meta: {
            title: '报名'
        }
    },
    {
        path: '/signup/process',
        component: SignUpProcess,
        meta: {
            title: '报名指导'
        }
    },
    {
        path: '/certificate',
        component: Certificate,
        meta: {
            title: '证书寄送'
        }
    },
    {
        path: '/corrigendum',
        component: Corrigendum,
        meta: {
            title: '信息勘误'
        }
    },
    {
        path: '/results/inquire',
        component: ResultsInquire,
        meta: {
            title: '成绩查询'
        }
    },
    {
        path: '/results/analyse',
        component: ResultAnalyse,
        meta: {
            title: '成绩分析'
        }
    },
    {
        path: '/results/reconsider',
        component: ResultReconsider,
        meta: {
            title: '成绩复议'
        }
    },
    {
        path: '/exam/management',
        component: ExamManagement,
        meta: {
            title: '考试管理'
        }
    },
    {
        path: '/exam/navigation',
        component: ExamNavigation,
        meta: {
            title: '考点导航'
        }
    },
    {
        path: '/reconsideration',
        component: Reconsideration,
        meta: {
            title: '复议申请'
        }
    },
    {
        path: '/setting/preference',
        component: Preference,
        meta: {
            title: '偏好设置'
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: {
            title: '支付'
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            title: '订单'
        }
    },
    {
        path: '/404',
        component: NotFind,
        meta: {
            title: 'not find'
        }
    },
    {
        path: '/',
        component: User,
        meta: {
            title: '考培'
        }
    },
]

export default routeConfig