export default {
  formVariants: {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChilren: 1,
      },
    },
  },
  formChildren: {
    hidden: { y: -10, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
};
