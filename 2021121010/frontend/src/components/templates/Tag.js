function Tag({ text }) {
  return (
    <div
      style={{
        backgroundColor: "#4527a0",
        // padding: 2,
        paddingInline: 4,
        borderRadius: 5,
        color: "white",
        fontSize: "1rem",
      }}
    >
      {text}
    </div>
  );
}

export default Tag;
