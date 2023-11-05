import getLists from '@/app/actions/getLists';
import getUser from '@/app/actions/getUser';
import Avatar from '@/app/components/Avatar';
import ListSettings from '@/app/components/ListSettings';

const SettingsPage = async () => {
  const user: any = await getUser();
  const lists = await getLists();

  return (
    <div className='w-full h-full flex flex-col space-y-6 max-w-md'>
      <section>
        <h1 className='text-5xl my-4'>Settings</h1>
      </section>
      <section>
        <div className='overflow-auto flex flex-col space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col space-y-2'>
              <span className='text-3xl'>{user.name}</span>
              <span className='text-xl'>{user.email}</span>
            </div>
            <Avatar
              user={user}
              large
            />
          </div>
        </div>
      </section>
      <section>
        <ListSettings lists={lists} />
      </section>
    </div>
  );
};

export default SettingsPage;
