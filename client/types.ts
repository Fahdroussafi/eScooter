export interface Credentials {
  email?: string;
  password?: string;
  token?: string;
  name?: string;
}

export interface Props {
  navigation: any;
}

export interface MessageProps {
  message?: string;
  type?: string;
}

export interface MyTextInputProps {
  label: string;
  icon: any;
  isPassword?: boolean;
  hidePassword?: boolean;
  setHidePassword?: any;
  value: string;
  onChangeText: any;
  placeholder: string;
  placeholderTextColor: string;
  onBlur: any;
  keyboardType?: string;
  secureTextEntry?: boolean;
}

export interface ScouterProps {
    id : string;
    nom : string;
    description : string;
  }

    {/* <FlatList
          data={scouters}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Card key={item.id}>
              <Card.Title>{item.nom}</Card.Title>
              <Card.Divider />
              <Card.Image
                source={Scouter}
                style={{ width: 100, height: 100 , alignSelf: "center"}}
              />
              <Text style={{ marginBottom: 10 }}>{item.description}</Text>
              <Button
                icon={<Icon name="code" color="#ffffff" />}
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="VIEW NOW"
                onPress={() => navigation.navigate("Trotinette")}
              />
            </Card>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        /> */}