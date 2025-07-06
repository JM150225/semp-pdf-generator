interface NotificationCardProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  icon: string;
}

export default function NotificationCard({ type, title, message, icon }: NotificationCardProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 border-l-4 border-l-green-500';
      case 'error':
        return 'bg-red-50 border-red-200 border-l-4 border-l-red-500';
      case 'info':
        return 'bg-blue-50 border-blue-200 border-l-4 border-l-blue-500';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 border-l-4 border-l-yellow-500';
      default:
        return 'bg-gray-50 border-gray-200 border-l-4 border-l-gray-500';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'info':
        return 'text-blue-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-700';
      case 'error':
        return 'text-red-700';
      case 'info':
        return 'text-blue-700';
      case 'warning':
        return 'text-yellow-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className={`glassmorphism rounded-2xl p-6 shadow-xl mb-8 ${getTypeStyles()} animate-slide-in`}>
      <div className="flex items-center space-x-4">
        <i className={`${icon} text-3xl ${getIconColor()}`}></i>
        <div>
          <h4 className={`font-bold text-lg ${getTitleColor()}`}>{title}</h4>
          <p className="text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  );
}
