export default function Success({ txs }) {
    if (!txs) return null;
    return (
      <div className="alert alert-success mt-5">
        <div className="flex-1">
          <label>{txs}</label>
        </div>
      </div>
    );
  }
  