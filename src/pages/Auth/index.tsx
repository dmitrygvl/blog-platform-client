import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { useState, type FC } from 'react';
import Login from '../../features/user/Login';
import Register from '../../features/user/Register';

const Auth: FC = () => {
  const [selected, setSelected] = useState('login');
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as string)}
            >
              <Tab key="login" title="Войти">
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key="signup" title="Регистрация">
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
