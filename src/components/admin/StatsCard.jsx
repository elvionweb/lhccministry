const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <p className="text-blue-500 font-medium text-xl">{title}</p>
      <h3 className="text-xl font-bold mt-3">{value}</h3>
    </div>
  );
};

export default StatsCard;
