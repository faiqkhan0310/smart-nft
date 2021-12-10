import useSWR from 'swr';
// import fetcher from '@/lib/fetch';

// export function useCurrentUser() {
//   const { data, mutate } = useSWR('/api/user', fetcher);
//   const user = data?.user;
//   return [user, { mutate }];
// }

export function useUser(id) {
  const { data } = useSWR(`/api/users/${id}`, fetcher, { revalidateOnFocus: false });
  return data?.user;
}
export const fetcher = (url) => fetch(url).then((r) => r.json());

export function useCurrentUser() {
  const { data, mutate } = useSWR('/api/user', fetcher)
  // if data is not defined, the query has not completed
  const loading = !data
  const user = data?.user
  return [user, { mutate, loading }]
}
