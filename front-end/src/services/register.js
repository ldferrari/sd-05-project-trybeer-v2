export const roleRedirect = (result, history) => {
  if (result.role === 'administrator') history.push('/admin/orders');
  if (result.role === 'client') history.push('/products');
};
