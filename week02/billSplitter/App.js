import { useState } from "react";

const initialFriends = [
  {
    id: 1,
    name: "Pavit",
    image:
      "https://media.licdn.com/dms/image/C4D03AQEGOb9bUIj79w/profile-displayphoto-shrink_800_800/0/1611601469787?e=1710374400&v=beta&t=YVAphhjw8YSvMZ_j9-3jNfg9n91uNKiNFStc6eG5L-8",
    balance: -7,
  },
  {
    id: 2,
    name: "Sarasij",
    image:
      "https://media.licdn.com/dms/image/D4E03AQH0nhXMv-usxg/profile-displayphoto-shrink_100_100/0/1669941371522?e=1710374400&v=beta&t=lE8u8DgZgGqUpbTAKiXT4uAshiC61D1C27DCDK51Xj0",
    balance: 20,
  },
  {
    id: 3,
    name: "Manu",
    image:
      "https://media.licdn.com/dms/image/C5603AQHv2Me_P7_ERw/profile-displayphoto-shrink_400_400/0/1597315980531?e=1710374400&v=beta&t=JNpLg4ke4p9wtzyMbGuv-iZk5th3JVPl2KMqNB1ws18",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [addFriendShow, setAddFriendShow] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelection(friend) {
    setSelectedFriend((s) => (s?.id === friend.id ? null : friend));
    setAddFriendShow(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  function handleSettleUp(o) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === o.id ? { ...friend, balance: 0 } : friend
      )
    );
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectClick={handleSelection}
          onSettleUp={handleSettleUp}
        />
        {addFriendShow && (
          <AddFriend friends={friends} addNewFriend={setFriends} />
        )}
        <Button onClick={() => setAddFriendShow(!addFriendShow)}>
          {!addFriendShow ? "Add Friend" : "Close"}
        </Button>
      </div>
      {selectedFriend && (
        <BillForm
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
function FriendsList({ friends, selectedFriend, onSelectClick, onSettleUp }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelectClick={onSelectClick}
          onSettleUp={onSettleUp}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onSelectClick, onSettleUp }) {
  const isSelected = !selectedFriend ? false : selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${-friend.balance}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You are even with {friend.name}</p>}
      <Button onClick={() => onSelectClick(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
      <Button onClick={() => onSettleUp(friend)}>Settle Up</Button>
    </li>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function AddFriend({ friends, addNewFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) {
      return;
    }
    const newFriend = {
      name,
      image,
      balance: 0,
      id: friends[friends.length - 1].id + 1,
    };
    console.log(newFriend);
    addNewFriend([...friends, newFriend]);

    setName("");
    setImage("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👭 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>📷 Profile Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function BillForm({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoPaid, setWhoPaid] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoPaid === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <div className="form-header">
        <img src={selectedFriend.image} alt={selectedFriend.name}></img>
      </div>
      <h2> Split a bill with {selectedFriend.name}</h2>
      <label>💸 Amount:</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🧍 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      ></input>

      <label>👭 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend}></input>

      <label>🤑 Who paid</label>
      <select value={whoPaid} onChange={(e) => setWhoPaid(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
