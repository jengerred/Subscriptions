import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import { User} from '@/models/User';
import Dashboard from '@/app/components/Dashboard';

export default async function ProtectedDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) redirect('/login');

  try {
    const { payload } = await verifyJWT(token);
    await connectDB();

    const user = await User.findById(payload.userId)
      .select('firstName email createdAt')
      .exec(); 

    if (!user) redirect('/login');

    // Convert MongoDB types to primitives
    const serializedUser = {
      _id: user._id.toString(),
      firstName: user.firstName,
      email: user.email,
      createdAt: user.createdAt.toISOString()
  };
  
  

    return (
      <main>
        <Dashboard user={serializedUser} />
      </main>
    );

  } catch (error) {
    console.error('Dashboard auth error:', error);
    redirect('/login');
  }
}
