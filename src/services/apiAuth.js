import supabase from './supabase';

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error);
  }

  return data;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();

  if (!data.session) return null;

  if (error) throw new Error(error.message);

  return data.user;
}
