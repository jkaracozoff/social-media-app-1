import { Card, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Messages from "../Messages";
import Navbar from "../Navbar";
import UserMessengerEntries from "../UserMessengerEntries";
import { getConversations } from "../../api/messages";
import { isLoggedIn } from "../../helpers/authHelper";
import { useLocation } from "react-router-dom";

const MessengerView = () => {
  const [conservant, setConservant] = useState(null);
  const [conversations, setConversations] = useState(null);
  const user = isLoggedIn();
  const { state } = useLocation();
  const newConservant = state && state.user;

  const getConversation = (conversations, conservant) => {
    for (let i = 0; i < conversations.length; i++) {
      const conversation = conversations[i];
      if (conversation.recipient.username === conservant) {
        return conversation;
      }
    }
  };

  const fetchConversations = async () => {
    let conversations = await getConversations(user);
    if (
      newConservant &&
      !getConversation(conversations, newConservant.username)
    ) {
      const newConversation = {
        _id: newConservant._id,
        recipient: newConservant,
        new: true,
        messages: [],
      };
      setConservant(newConservant.username);
      conversations = [newConversation, ...conversations];
    }
    setConversations(conversations);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <Container>
      <Navbar />
      <Box>
        <Card sx={{ padding: 0 }}>
          <Grid
            container
            sx={{ height: "calc(100vh - 110px)" }}
            alignItems="stretch"
          >
            <Grid
              item
              xs={5}
              sx={{ borderRight: 1, borderColor: "divider", height: "100%" }}
            >
              <UserMessengerEntries
                conversations={conversations}
                setConservant={setConservant}
              />
            </Grid>
            <Grid item xs={7} sx={{ height: "100%" }}>
              <Messages
                conservant={conservant}
                conversations={conversations}
                setConversations={setConversations}
                getConversation={getConversation}
              />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};

export default MessengerView;