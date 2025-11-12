namespace Umbraco.Community.SkrivLet.Models
{
	public class SkrivLetBlock<T> : SkrivLetBlockBase where T : new()
	{
		public SkrivLetBlock(string id, string type)
		{
			Id = id;
			Type = type;
			Data = new T();
		}

		public T Data { get; set; }
	}
}
