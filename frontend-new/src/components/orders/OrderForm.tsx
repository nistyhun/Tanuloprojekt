import type { Category } from "@/app/types/order";

type OrderFormErrors = {
  customerName: string;
  publisherName: string;
  categoryId: string;
  deadline: string;
  quantity: string;
};

type OrderFormProps = {
  title: string;
  customerName: string;
  onCustomerNameChange: (value: string) => void;
  publisherName: string;
  onPublisherNameChange: (value: string) => void;
  categories: Category[];
  categoryId: number;
  onCategoryChange: (value: number) => void;
  deadline: string;
  onDeadlineChange: (value: string) => void;
  quantity: number;
  onQuantityChange: (value: number) => void;
  errors: OrderFormErrors;
};

export default function OrderForm({
  title,
  customerName,
  onCustomerNameChange,
  publisherName,
  onPublisherNameChange,
  categories,
  categoryId,
  onCategoryChange,
  deadline,
  onDeadlineChange,
  quantity,
  onQuantityChange,
  errors,
}: OrderFormProps) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="customerName">Megrendelő</label>
        <input
          type="text"
          id="customerName"
          className="border border-gray-400 rounded-md p-1"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
        ></input>
        {errors.customerName && (
          <p className="text-sm text-red-500">{errors.customerName}</p>
        )}
        <label htmlFor="publisherName">Kiadó</label>
        <input
          type="text"
          id="publisherName"
          name="publisherName"
          className="border border-gray-400 rounded-md p-1"
          value={publisherName}
          onChange={(e) => onPublisherNameChange(e.target.value)}
        ></input>
        {errors.publisherName && (
          <p className="text-sm text-red-500">{errors.publisherName}</p>
        )}
        <label htmlFor="category">Kategória</label>
        <select
          id="category"
          name="category"
          className="border border-gray-400 rounded-md p-1"
          value={categoryId}
          onChange={(e) => onCategoryChange(Number(e.target.value))}
        >
          <option value="0">Válassz kategóriát</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.type}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-sm text-red-500">{errors.categoryId}</p>
        )}
        <label htmlFor="deadline">Határidő</label>
        <input
          id="deadline"
          name="deadline"
          type="date"
          className="border border-gray-400 rounded-md p-1"
          value={deadline}
          onChange={(e) => onDeadlineChange(e.target.value)}
        ></input>
        {errors.deadline && (
          <p className="text-sm text-red-500">{errors.deadline}</p>
        )}
        <label htmlFor="quantity">Mennyiség</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          className="border border-gray-400 rounded-md p-1"
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
        ></input>
        {errors.quantity && (
          <p className="text-sm text-red-500">{errors.quantity}</p>
        )}
      </div>
    </div>
  );
}
