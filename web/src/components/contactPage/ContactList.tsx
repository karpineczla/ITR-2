import { useState, useEffect } from 'react';
import { client } from '../../sanityClient';

export default function ContactList() {
  const [members, setMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  useEffect(() => {
    const query = `*[_type == "contactCards"][0]{
      cards[]{
        _key, name, role, email, phone, bio,
        "image": image.asset->url
      }
    }`;
    client.fetch(query).then((result) => setMembers(result?.cards || []));
  }, []);

  return (
    <div className="contact-page-container" >
      <h1 className="contact-main-title" id="contact">Contact Us</h1>
      
      <div className="contact-grid">
        {members.map((member) => (
          <div key={member._key} className="contact-card" onClick={() => setSelectedMember(member)}>
            <div className="contact-card-inner">
              <img src={member.image} alt={member.name} className="contact-card-img" />
              <div className="contact-card-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="email-link">{member.email}</p>
                <span className="show-more">show more</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMember && (
        <div className="contact-overlay" onClick={() => setSelectedMember(null)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMember(null)}>×</button>
            <div className="modal-top">
              <img src={selectedMember.image} alt={selectedMember.name} className="modal-img" />
              <div className="modal-header-text">
                <h2>{selectedMember.name}</h2>
                <p className="modal-role">{selectedMember.role}</p>
                <p className="modal-contact-item"><strong>email:</strong> {selectedMember.email}</p>
                {selectedMember.phone && <p className="modal-contact-item"><strong>phone:</strong> {selectedMember.phone}</p>}
              </div>
            </div>
            <div className="modal-bio"><p>{selectedMember.bio}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}